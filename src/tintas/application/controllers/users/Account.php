<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Account extends CI_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('users');

        if(!$this->session->userdata('logged_in'))
        {
            redirect('users/login','refresh');
        }
    }

    function index()
    {
        $dataHeader = array(
            'logged_in' => $this->session->userdata('logged_in') ? true : false,
            'admin' => $this->session->userdata('logged_in')['role'] == 1 ? true: false
        );
        $data = $this->session->userdata('logged_in');


        $this->load->view('html/Header', $dataHeader);
        $this->load->view('users/Account', $data);
        $this->load->view('html/Footer');
    }

    function update()
    {
        $this->form_validation->set_rules('username', 'Login', 'trim|required');
        $this->form_validation->set_rules('email', 'Email', 'required|valid_email');

        if($this->form_validation->run() == FALSE){
            $this->index();
        }
        else{
            $this->users->update();

            $sess_array =$this->Users->getById($this->input->post('id'));
            $this->session->set_userdata('logged_in', (array)$sess_array[0]);
            redirect('users/Account','refresh');
        }
    }

    function updatePassword()
    {
        $this->form_validation->set_rules('password', 'Password', 'required|callback_check_database');
        $this->form_validation->set_rules('newPassword', 'NewPassword', 'trim|required|xss_clean');
        $this->form_validation->set_rules('confirm', 'Confirm', 'matches[newPassword]');

            if($this->form_validation->run() == FALSE){
                $this->index();
            }
            else{
                $this->users->updatePassword();
                redirect('users/Account','refresh');
            }  
    }

    function check_database($password)
    {
        $result = $this->users->loginById();

        if($result)
        {
            return true;
        }
        else
        {
            $this->form_validation->set_message('check_database', 'Invalid password');
            return false;
        }
    }
}