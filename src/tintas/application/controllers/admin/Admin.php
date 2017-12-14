<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

abstract class Admin extends CI_Controller {

    const ROLE_ADMIN = 1;

    function __construct()
    {
        parent::__construct();

        $session_data = $this->session->userdata('logged_in');
        if(intval($session_data['role']) !== self::ROLE_ADMIN){
            show_404();
        }
    }
}