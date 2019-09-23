<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

/**
 * Description of ajaxupload
 *
 * @author https://roytuts.com
 */
class AjaxFileUpload extends CI_Controller {

    function __construct() {
        parent::__construct();
    }

    function index() {
        $this->load->view('file_upload_ajax', NULL);
    }

    function upload_file() {

        //upload file
        $config['upload_path'] = 'uploads/';
        $config['allowed_types'] = '*';
        $config['max_filename'] = '255';
        $config['encrypt_name'] = TRUE; // encryption - good ;)


        $config['max_size'] = '1024'; //1 MB

        header('Content-Type: application/json');

        $out = new \stdClass();
        $out->code = 200;
        $out->message = '';
        $out->step = 'upload';


        if (isset($_FILES['file']['name'])) {
            // $config['file_name'] = $_FILES['file']['name']; // Set Name


            if (0 < $_FILES['file']['error']) {
                // echo 'Error during file upload' . $_FILES['file']['error'];
                $out->code = 300;
                $out->message = 'Error during file upload' . $_FILES['file']['error'];


            } else {

                $this->load->library('upload', $config);
                if (!$this->upload->do_upload('file')) {
                    // echo $this->upload->display_errors();

                    $out->code = 300;
                    $out->message = $this->upload->display_errors();

                } else {

                    //echo 'File successfully uploaded : uploads/' . $_FILES['file']['name'];
                    // echo $this->upload->data('file_name');
                    $out->message = 'ok';


                    $content = file_get_contents($this->upload->data('full_path'));
                    $out = $this->processing( $content );
                    unlink($this->upload->data('full_path')); // Cleaning is good
                    // full_path => Absolute server path, including the file name

                }


            }
        } else {
            // echo 'Please choose a file';
            $out->code = 300;
            $out->message = "No file was provided.";
        }

        echo json_encode($out);


    }


    function processing($json_content){

        // some default values
        $out = new \stdClass();
        $out->code = 200;
        $out->message = '';
        $out->step = 'processing';

// print_r($json_content);


        // Step 01: Try To Parse
        $json = json_decode($json_content);

//        print_r($json);

        if (json_last_error() === JSON_ERROR_NONE) {
            //do something with $json. It's ready to use

            // Step 02: Check if json returned array
            if( !is_array($json->features) ){
                $out->code = 300;
                $out->message = "GeoJson doesn't have any data";


            }elseif( sizeof($json->features) == 0 ){
                // Step 03: Number of Elements in Array > 0
                $out->code = 300;
                $out->message = "Zero Elements in GeoJson";


            }

            // Step 04: Check if has all the required fields => aka lng & lat & name (info - not a required field)
            $element_error = FALSE;
            /*
            foreach ($json AS $item){
                if( !isset($item->lat) || !isset($item->lng) || !isset($item->title)  ){
                    $out->code = 300;
                    $out->message = "Some points have missing data.";
                }

            }
            */

            if( $out->code == 200 ){
                $out->data = $json->features;
            }



        } else {
            //yep, it's not JSON. Log error or alert someone or do nothing
            switch (json_last_error()) {
                case JSON_ERROR_NONE:
                    $out->message = 'No errors';
                    break;
                case JSON_ERROR_DEPTH:
                    $out->message ='Maximum stack depth exceeded';
                    break;
                case JSON_ERROR_STATE_MISMATCH:
                    $out->message = 'Underflow or the modes mismatch';
                    break;
                case JSON_ERROR_CTRL_CHAR:
                    $out->message = 'Unexpected control character found';
                    break;
                case JSON_ERROR_SYNTAX:
                    $out->message = 'Syntax error, malformed JSON';
                    break;
                case JSON_ERROR_UTF8:
                    $out->message = 'Malformed UTF-8 characters, possibly incorrectly encoded';
                    break;
                default:
                    $out->message = 'Unknown error';
                    break;
            }

            $out->code = 300;

        }

        return $out;
    }

}