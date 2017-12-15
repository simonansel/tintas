<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH.'controllers/admin/Admin.php';

class Liste extends Admin {

    /**
     * Liste constructor.
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * index vue
     */
    public function index()
    {
        $this->load->model('Users');

        $dataHeader = array(
            'logged_in' => $this->session->userdata('logged_in') ? true : false,
            'admin' => $this->session->userdata('logged_in')['role'] == 1 ? true: false
        );
        $data =array(
            "users" => $this->Users->getAll(),
            "userOne" => $this->Users->getOne()
        );

        $this->load->view('html/Header', $dataHeader);
        $this->load->view('admin/users/Liste', $data);
        $this->load->view('html/Footer');
    }

    function update()
    {
        $this->form_validation->set_rules('username', 'Login', 'trim|required');
        $this->form_validation->set_rules('email', 'Email', 'required|valid_email');
        $this->form_validation->set_rules('password', 'Password', 'trim|required');
        $this->form_validation->set_rules('nom', 'Nom', 'trim|required');
        $this->form_validation->set_rules('prenom', 'Prenom', 'trim|required');

        if($this->form_validation->run() == FALSE){
            $this->index();
        }
        else{
            $this->load->model('Users');
            $this->Users->update();

            redirect('admin/users/Liste','refresh');
        }
    }

    function updatePassword()
    {
        $this->form_validation->set_rules('password', 'Password', 'trim|required');

        if($this->form_validation->run() == FALSE){
            $this->index();
        }
        else{
            $this->load->model('Users');
            $this->Users->updatePassword();

            redirect('admin/users/Liste','refresh');
        }
    }
}