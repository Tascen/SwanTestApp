<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Class Book_model
 * Модель для работы с книгами
 */
class Book_model extends CI_Model {

	public function __construct() {
		$this->load->database();
	}




	public function loadList() {
		$query = $this->db->get('books');
		$result = $query->result_array();
		if (isset($result)) {
			return array_map(function($book) {
				return array(
					"book_id" => $book["id"],
					"book_name" => $book["name"],
					"author_name" => $book["author"],
					"book_year" => $book["yearIssue"]
				);
			}, $result);
		}
		return array();
	}


	public function insertBook($data) {
		$id = $this->db->query("SELECT FLOOR(10000 + RAND() * 89999) AS 'random_number' FROM `books` WHERE 'random_number' NOT IN (SELECT `id` FROM `books`) LIMIT 1")->row_array()['random_number'];
		$name = $this->db->escape($data["book_name"]);
		$author = $this->db->escape($data["author_name"]);
		$yearIssue = $this->db->escape($data["book_year"]);


		/*
		"
		INSERT INTO `books` (`id`, `name`, `author`, `yearIssue`)
		SELECT FLOOR(10000 + RAND() * 89999) AS 'random_number', ".$name.", ".$author.", ".$yearIssue."
		FROM `books`
		WHERE 'random_number' NOT IN (SELECT `id` FROM `books`) GROUP BY ".$name."
		"
		*/
		$sql = "INSERT INTO `books` (`id`, `name`, `author`, `yearIssue`) VALUES (".$id.", ".$name.", ".$author.", ".$yearIssue.")";
		$this->db->query($sql);


		return array(
			"book_id" => $id,
			"book_name" => $data["book_name"],
			"author_name" => $data["author_name"],
			"book_year" => $data["book_year"],
		);
	}


	public function updateBook($data) {
		$id = $this->db->escape($data["book_id"]);

		if (isset($data["book_id"])) {
			$columns = [];
			if ( isset($data["book_name"]) ) {
				array_push($columns, "`name`=".$this->db->escape($data["book_name"]));
			}
			if ( isset($data["author_name"]) ) {
				array_push($columns, "`author`=" . $this->db->escape($data["author_name"]));
			}
			if ( isset($data["book_year"]) ) {
				array_push($columns, "`yearIssue`=" . $this->db->escape($data["book_year"]));
			}
			$query_str ="UPDATE `books` SET " . implode(",", $columns) . " WHERE `books`.`id` = " . $id;
			$this->db->query($query_str);


			return array(
				"book_id" => $id,
				"book_name" => $data["book_name"],
				"author_name" => $data["author_name"],
				"book_year" => $data["book_year"],
			);
		}
	}


	public function deleteBook($id) {
		$this->db->query("DELETE FROM `books` WHERE id=" . $this->db->escape($id));
		return $id;
	}
}
