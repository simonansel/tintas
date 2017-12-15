<?php


class StatsModel extends CI_Model
{

    public function getAll()
    {
        $this->db->select('users.login, statistiques.nbWin, statistiques.nbPlayed, statistiques.nbDraw');
        $this->db->from('users');
        $this->db->join('StatsModel', 'statistiques.userId = users.id', 'left');

        $query = $this->db->get('users');
        return $query->result();
    }

    function getStatsById($id)
    {
        $this->db->select('nbWin, nbDraw, nbPlayed');
        $this->db->where('userId', $id);
        $this->db->from('statistiques');
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

}
