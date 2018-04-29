<?php

error_reporting(E_ALL);

if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')
{
	$domain	= $_SERVER["HTTP_HOST"];

	$parse_url = parse_url($_SERVER["REQUEST_URI"]);
	$path = preg_split('/\/+/', $parse_url['path'], -1, PREG_SPLIT_NO_EMPTY);
	
	$controller = isset($path[1]) ? $path[1] : '';
	$action = isset($path[2]) ? $path[2] : '';

	include_once '../define.php';

	if (!session_id())
	{
		session_start();
	}

	if ($controller == 'sendmessage')
	{
		$status = false;
		$errors = array();
		$responce = array();

		$name = isset($_POST['name']) ? $_POST['name'] : '';
		$phone = isset($_POST['phone']) ? $_POST['phone'] : '';

		if ($name == '')
		{
			$errors['name'] = 'name';
		}

		if ($phone == '')
		{
			$errors['phone'] = 'phone';
		}
		else
		{
			$_phone = str_replace(array('(', ')', '-', ' ', '+'), '', $phone);

			if (strlen($_phone) !== 11)
			{
				$errors['phone'] = 'phone';
			}
		}

		if (empty($errors))
		{
			$message = '<p>Имя: ' . $name . '</p><p>Телефон: ' . $phone . '</p>';
			$responce['message'] = $message;
			$emails = getfl('emails');
	        sendMail('Заказ консультации с сайта', $message, 'info@sk-zenit.ru', $emails, 'sD1VRF4J', 'smtp.timeweb.ru');
	        $status = true;

	        O('_mdd_consultation')->create(array(
	            's:name'        =>  $name,
	            's:phone'       =>  $phone,
	            'e:created'     =>  'NOW()',
	            'i:visible'     =>  1
	        ));
       	}

		$responce['status'] = $status;
		$responce['errors'] = $errors;

		if ($status)
		{
			//$responce['title'] = 'Спасибо';
			//$responce['message'] = 'Ваше сообщение было отправлено успешно. Спасибо.';
		}

		exit(
			json_encode( $errors, 64 | 256 )
		);
	}

	if ($controller == 'feedback')
	{
		$status = false;
		$errors = array();
		$responce = array();

		$name = isset($_POST['name']) ? $_POST['name'] : '';
		$phone = isset($_POST['phone']) ? $_POST['phone'] : '';
		$text = isset($_POST['text']) ? $_POST['text'] : '';

		if ($text == '')
		{
			$errors['text'] = 'text';
		}

		if ($name == '')
		{
			$errors['name'] = 'name';
		}


		$_phone = str_replace(array('(', ')', '-', ' ', '+'), '', $phone);

		if (strlen($_phone) !== 11 || $phone == '')
		{
			$errors['phone'] = 'phone';
		}
		

		if (empty($errors))
		{
			$message = '<p><strong>Имя: </strong>' . $name . '</p><p><strong>Телефон: </strong>' . $phone . '</p><p><strong>Сообщение: </strong>'. $text .'</p>';
			$emails = getfl('emails');
	        sendMail('Сообщение с сайта КС-Клиник', $message, '92279@inbox.ru', $emails, '2212198638180067olga', 'smtp.inbox.ru');
	        $status = true;

	        //O('_mdd_consultation')->create(array(
	        //    's:name'        =>  $name,
	        //    's:phone'       =>  $phone,
	        //    'e:created'     =>  'NOW()',
	        //    'i:visible'     =>  1
	        //));
       	}

		$responce['status'] = $status;
		$responce['errors'] = $errors;		

		exit(
			json_encode( $responce, 64 | 256 )
		);
	}

	elseif( $controller == 'search' )
	{
		$term = __get( 'term' );
		$result = Q("SELECT `id`, `city`, `region` FROM `#_mdd_cityes` WHERE `city` LIKE '%". $term ."%' ORDER BY `city` ASC LIMIT 10")->all();
		if( !empty ( $result ) )
		{
			foreach( $result as &$arr )
			{
				$arr['label'] = str_replace( $term, '<span class="autocomplete-selected">' . $term . '</span>', $arr['city'] );
			}
		}
		echo json_encode( $result );
	}

	elseif ($controller == 'registration')
	{
		$phone 		= __post('phone');
		$password 	= __post('password');
		$name 		= __post('name');
		$email 		= __post('email');
		$city 		= __post('city');
		$address 	= __post('address');

		$result = Q("INSERT INTO `#_mdd_users` SET `phone`=?s, `password`=?s, `name`=?s, `email`=?s, `city`=?s, `address`=?s, `created`=NOW()", array( 
			$phone, md5( $password ), $name, $email, $city, $address
		));

		echo json_encode( array( 'result' => 1 ), 64 | 256 ); 
	}

	elseif( $controller == 'validation' )
	{
		$value = __post('value');
		$field = isset($path[2] ) ? $path[2] : '';

		if( $field !== '' )
		{
			if( $field == 'email' )
			{
				if( !isset($_SESSION['registration']['email_code'] ) || empty( $_SESSION['registration']['email_code'] ) )
				{
					$_SESSION['registration']['email_code'] = rand(10000, 99990);

					$code = $_SESSION['registration']['email_code'];
					$domen = str_replace( array( 'http://', 'www.', 'www' ) , '', $_SERVER['SERVER_NAME'] );
				   
					$m  = '<p>Здравствуйте!</p>';
					$m .= '<p>Ваш код подтверждения на сайте ' . $domen . ': ' . $code . '</p>';
					$m .= '<p>Дата и время отправки сообщения: '. date( 'd.m.Y H:i:s' ) .'</p>';

					$sended = sendMail('Подтверждение адреса электронной почты', $m, 'info@' . $domen, $value);
					
					$result = (int)is_email($value) && $sended;
				}
				else
				{
					$result = 0;
				}

				echo
					json_encode(
						array(
							'result' => $result
						), 64 | 256
					);
			}
			elseif( $field == 'email_code' )
			{
				if( $_SESSION['registration']['email_code'] == $value )
				{
					$result = 1;
				}
				else
				{
					$result = 0;
				}

				echo json_encode(
					array(
						'result' => $result
					), 64 | 256
				);
			}
			elseif( $field == 'phone' )
			{
				if( is_phone($value) )
				{
					$domen = str_replace( array( 'http://', 'www.', 'www' ) , '', $_SERVER['SERVER_NAME'] );
					$phone = str_replace( array( '+', '(', ')', ' ', '-' ), '', $value );

					if( !isset($_SESSION['registration']['phone_code'] ) || empty( $_SESSION['registration']['phone_code'] ) )
					{
						$_SESSION['registration']['phone_code'] = rand(10000, 99990);

						$code = $_SESSION['registration']['phone_code'];
						$url = "http://sms.ru/sms/send?api_id=973996a8-7094-1674-d1b6-e7f63a0c826a&to=". $phone ."&text=" . urlencode( "Ваш код подтверждения на сайте " . $domen . ": " ) . $code;
						$responce = file_get_contents( $url );
					}

					$result = 1;
				}
				else
				{
					$result = 0;
				}
				
				echo json_encode(
					array(
						'result' => $result
					), 64 | 256
				);
			}
			elseif( $field == 'phone_code' )
			{
				if( $_SESSION['registration']['phone_code'] == $value )
				{
					$result = 1;
				}
				else
				{
					$result = 0;
				}

				echo json_encode(
					array(
						'result' => $result
					), 64 | 256
				);
			}
			elseif( $field == 'fio' )
			{
				if((bool)preg_match('~[^а-яёА-ЯЁ\- ]~u', $value))
				{
					$result = 0;
				}
				else
				{
					$result = 1;
				}

				echo json_encode(
					array(
						'result' => $result
					), 64 | 256
				);
			}
			elseif( $field == 'address' )
			{
				$result = 1;
				
				echo json_encode(
					array(
						'result' => $result
					), 64 | 256
				);
			}
			elseif( $field == 'birthdate' )
			{
				echo json_encode(
					array(
						'result' => 0
					), 64 | 256
				);
			}
			elseif( $field == 'passport_series' )
			{
				echo json_encode(
					array(
						'result' => 0
					), 64 | 256
				);
			}
			elseif( $field == 'passport_number' )
			{
				echo json_encode(
					array(
						'result' => 0
					), 64 | 256
				);
			}
			elseif( $field == 'passport_issued' )
			{
				echo json_encode(
					array(
						'result' => 0
					), 64 | 256
				);
			}
			elseif( $field == 'passport_date' )
			{
				echo json_encode(
					array(
						'result' => 0
					), 64 | 256
				);
			}
			elseif( $field == 'info' )
			{
				echo json_encode(
					array(
						'result' => 1
					), 64 | 256
				);
			}
			elseif( in_array( $field, array( 'site', 'vkontakte', 'facebook', 'odnoklassniki', 'moimir', 'twitter', 'livejournal' ) ) )
			{
				$result = ( _isURL( $value ) && checkLink( $value ) ) ? 1 : 0 ;
				
				echo json_encode(
					array(
						'result' => $result
					), 64 | 256
				);
			}
			else
			{
				echo json_encode(
					array(
						'result' => 0
					), 64 | 256
				);
			}
		}
	}

	return true ;
}