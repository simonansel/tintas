<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH.'controllers/admin/Admin.php';

class Stats extends CI_Controller {

    /**
     * Liste constructor.
     */
    public function __construct()
    {
        parent::__construct();
        $this->load->model('users');

        if(!$this->session->userdata('logged_in'))
        {
            redirect('users/login','refresh');
        }
    }

    /**
     * index vue
     */
    public function index()
    {
        $this->load->model('StatsModel');
        $userData= $this->session->userdata('logged_in');
        $dataHeader = array(
            'logged_in' => $this->session->userdata('logged_in') ? true : false,
            'admin' => $this->session->userdata('logged_in')['role'] == 1 ? true: false
        );
        $data =array(
            "stats" => $this->StatsModel->getStatsById($userData['id'])[0]
        );

        $this->load->view('html/Header', $dataHeader);
        $this->load->view('stats/Stats', $data);
        $this->load->view('html/Footer');
    }

}