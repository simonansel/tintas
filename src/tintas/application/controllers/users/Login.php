<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Login extends CI_Controller {

    function __construct()
    {
        parent::__construct();
        $this->load->model('users');
    }

    function index()
    {
        if($this->session->userdata('logged_in'))
        {
            redirect('users/account','refresh');
        }

        $this->load->view('html/Header');
        $this->load->view('users/Login');
        $this->load->view('html/Footer');
    }

    function verify()
    {
        $this->form_validation->set_rules('username', 'Username', 'trim|required|xss_clean');
        $this->form_validation->set_rules('password', 'Password', 'trim|required|xss_clean|callback_check_database');

        if($this->form_validation->run() == FALSE)
        {
            $this->index();
        }
        else
        {
            redirect('users/account', 'refresh');
        }
    }

    function check_database($password)
    {
        $username = $this->input->post('username');
        $result = $this->users->login($username, $password);

        if($result)
        {
            foreach($result as $row)
            {
                $sess_array = array(
                    'id' => $row->id,
                    'login' => $row->login,
                    'email' => $row->email,
                    'nom' => $row->nom,
                    'prenom' => $row->prenom,
                    'role' => $row->role
                );
                $this->session->set_userdata('logged_in', $sess_array);
            }
            return true;
        }
        else
        {
            $this->form_validation->set_message('check_database', 'Invalid username or password');
            return false;
        }
    }
}