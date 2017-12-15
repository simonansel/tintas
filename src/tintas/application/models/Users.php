<?php


class Users extends CI_Model
{
    function login($username, $password)
    {
        $this->db->select('id, login, email, nom, prenom, role');
        $this->db->from('users');
        $this->db->where('login', $username);
        $this->db->where('pass', hash("sha256", $password));
        $this->db->limit(1);

        $query = $this->db->get();

        if($query->num_rows() == 1)
        {
            return $query->result();
        }
        else
        {
            return false;
        }
    }

    function loginById()
    {
        $this->db->select('id, login, email, nom, prenom, role');
        $this->db->from('users');
        $this->db->where('id', $this->input->post('id'));
        $this->db->where('pass', hash("sha256", $this->input->post('password')));
        $this->db->limit(1);

        $query = $this->db->get();

        if($query->num_rows() == 1)
        {
            return $query->result();
        }
        else
        {
            return false;
        }
    }

    function getById($id)
    {
        $this->db->select('id, login, email, nom, prenom, role');
        $this->db->from('users');
        $this->db->where('id', $id);
        $this->db->limit(1);

        $query = $this->db->get();

        if($query->num_rows() == 1)
        {
            return $query->result();
        }
        else
        {
            return false;
        }
    }

    public function getAll()
    {
        $query = $this->db->get('users');
        return $query->result();
    }

    public function getOne()
    {
        $query = $this->db->get('users',1);
        return $query->result();
    }

    public function save()
    {
        $data = array(
            'login' => $this->input->post('login'),
            'pass' => hash('sha256', $this->input->post('pass')),
            'email' => $this->input->post('email'),
            'nom' => $this->input->post('nom'),
            'prenom' => $this->input->post('prenom')
        );

        $this->db->insert('users', $data);
    }

    public function update()
    {
        $this->db->set('login', $this->input->post('username'));
        $this->db->set('email', $this->input->post('email'));
        $this->db->set('nom', $this->input->post('nom'));
        $this->db->set('prenom', $this->input->post('prenom'));
        if($this->input->post('password') != '******')
            $this->db->set('pass', hash('sha256', $this->input->post('password')));
        $this->db->where('id', $this->input->post('id'));
        $this->db->update('users');
    }

    public function updatePassword()
    {
        $this->db->set('pass', hash('sha256', $this->input->post('newPassword')));
        $this->db->where('id', $this->input->post('id'));
        $this->db->update('users'); 
    }
}
