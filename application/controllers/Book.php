<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Class Book
 * Контроллер для работы с книгами
 */
class Book extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model('Book_model');
	}



	public function loadList() {
		$bookList = $this->Book_model->loadList();
		echo json_encode($bookList);
	}

	public function insertBook() {
		$decoded = get_ajax_body();

		if ($decoded["status"] === "error") {
			header('Content-Type: application/json');
			http_response_code(400);
			echo json_encode(array("status"=>"error"));
			return 0;
		}

		$inserted_book = $this->Book_model->insertBook($decoded);
		header('Content-Type: application/json');
		echo json_encode($inserted_book);
	}

	public function updateBook() {
		$decoded = get_ajax_body();
		if ($decoded["status"] === "error") {
			echo json_encode($_SERVER);
			//echo json_encode(array("status"=>"error"));
			return 0;
		}
		header('Content-Type: application/json');
		$updated_book = $this->Book_model->updateBooks($decoded);

		echo json_encode($updated_book);
	}

	public function deleteBook() {
		$decoded = get_ajax_body();
		if ($decoded["status"] === "error") {
			echo json_encode($decoded);
			return 0;
		}
		$id = $this->Book_model->deleteBook($decoded["book_id"]);
		header('Content-Type: application/json');
		echo json_encode(array("book_id"=>$id));
	}

	public function exportList() {
		$xml_contents = "<books>";
		$bookList = $this->Book_model->loadList();
		foreach ($bookList as &$book) {
		  $xml_contents .= "<book><id>".$book["book_id"]."</id><name>".$book["book_name"]."</name><author>".$book["author_name"]."</author></book>";
		}
		$xml_contents .= "</books>";

		header('Content-type: text/xml');
		header('Content-Disposition: attachment; filename="text.xml"');
		echo $xml_contents;
	}

}

function get_ajax_body() {
	$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
	if ($contentType !== "application/json") {
		return array("status"=>"error", "error_info"=>"Content-Type is not application/json");
	}

	$decoded = json_decode(trim(file_get_contents("php://input")), true);
	if(!is_array($decoded)) {
		return array("status"=>"error", "error_info"=>"");
	}


	return array_merge($decoded, array("status"=>"ok"));
}
