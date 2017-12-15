<?php if (!defined('BASEPATH')) { exit('No direct script access allowed'); }

class Home extends CI_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('users');
    }

    public function index()
    {
        $dataHeader = array(
            'logged_in' => $this->session->userdata('logged_in') ? true : false,
            'admin' => $this->session->userdata('logged_in')['role'] == 1 ? true: false
        );
        $this->load->view('html/Header', $dataHeader);
        $this->load->view('home/index');
        $this->load->view('html/Footer');
    }
}