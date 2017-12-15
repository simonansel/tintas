<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Register extends CI_Controller {

    public function index()
    {
        $this->load->view('html/Header');
        $this->load->view('users/Register');
        $this->load->view('html/Footer');
    }

    public function save(){

        $this->form_validation->set_rules('login', 'Login', 'trim|required|xss_clean');
        $this->form_validation->set_rules('pass', 'Password', 'trim|required|xss_clean');

        if($this->form_validation->run() == FALSE)
        {
            $this->index();
        }
        else
        {
            $this->load->model('Users');
            $this->Users->save();

            redirect('users/login', 'refresh');
        }

    }
}
