<?php
//header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Methods: GET, POST');  
//var_dump($_GET); 
//


if( !empty($_GET["sign"])) {
	$config=array(
		"D0"=>"DIV-0",
		"TOOLONG"=>"TOO LONG",
		"ROUNDED"=>"Rounded",
		"displayLength"=>8,
		"lengthIncludeDot"=>false
	);
	//ini_set('precision', $config["displayLength"]+2);
	$result = array(
		"result"=>0,
		"floating"=>false,
		"msg"=>""
	);
	$a = floatval($_GET["a"]);
	$b = floatval($_GET["b"]);
	//$sign = urldecode($_GET["sign"]);
	$sign = $_GET["sign"];
	//var_dump($sign);
	switch ($sign) {
	case "+":
		$result["result"] = $a + $b;
		break;
	case "-":
		$result["result"] = $a - $b;
		break;
	case "*":
		$result["result"] = $a * $b;
		break;
	case "/":
		if($b==0){
			$result["msg"] = $config["D0"];

			echo json_encode($result);
			exit();
		}
		$result["result"] = $a / $b;
		break;
	default:
		echo "wrong sign";
	}
	//list($integer, $decimal) = 
	//	explode(".", number_format($result["result"], $config["displayLength"]+2, '.', ''));
	
	$integer = floor($result["result"]);
	$decimal = $result["result"] - $integer;

	//echo $integer."...". $decimal;

	$resultLength = strlen(  $integer  );

	if( $resultLength > $config["displayLength"] ){
		$result["result"] = 0;
		$result["msg"] = $config["TOOLONG"];

		echo json_encode($result);
		exit();
	}else{	// result length is alright

		if($decimal>0) {  // have decimal part
			$result["floating"] = true;

			$decimalLength = $config["displayLength"] - $resultLength;
			if($decimalLength<0) $decimalLength=0;

			$decimal = TrimDecimal($decimal, $decimalLength+2 );
			$newDecimal = TrimDecimal($decimal, $decimalLength );
			//echo "(".$newDecimal.")";

			if($newDecimal < $decimal) $result["msg"] = $config["ROUNDED"];

			$result["result"] = $integer + $newDecimal;

		}else{	// does not have decimal part



		}
	}


	//if($roundedResult!=$result["result"]){ // float
	//	$result["floating"] = true;
//
	//	echo $config["displayLength"]-$resultLength."\n";
	//	$decimal = log10($result["result"] - $roundedResult);
	//	echo $decimal;
	//	// if i can show all digits
	//	if(-1*log10($result["result"]) <=  $config["displayLength"]-$resultLength){// -1 is for the dot
	//		// do no changes
	//	}else{
	//		$result["result"] = round( $result["result"], $config["displayLength"]-$resultLength, PHP_ROUND_HALF_DOWN );
	//		$result["msg"] = $config["ROUNDED"];
	//	}
//
	//}else{
//
//
	//}

	echo json_encode($result);
	exit();


}else{
	echo "error: wrong format (expects a, sign, b)";
}



function TrimDecimal($number, $trimLength){
	$result = 0;
	$exponent = 1;
	for($i=0; $i < $trimLength && $number>0; $i++){
		$number*=10;

		$result += $exponent*floor($number);
		$exponent /=10;

		$number -= floor($number);
	}
	return $result/10;
}

?>
