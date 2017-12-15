<?php if (!defined('BASEPATH')) { exit('No direct script access allowed'); }

/**
 * Created by PhpStorm.
 * User: exoleet
 * Date: 14/12/17
 * Time: 11:22
 */

class Game extends CI_Controller
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
        $this->load->view('game/Game');
        $this->load->view('html/Footer');
    }
}