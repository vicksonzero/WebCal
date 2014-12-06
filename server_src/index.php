<?php
header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Methods: GET, POST');  
if( $_POST["sign"]){
	$config=array(
		"D0"=>"DIV-0",
		"TOOLONG"=>"TOO LONG",
		"ROUNDED"=>"Rounded",
		"displayLength"=>8
	);
	$result = array(
		"result"=>0,
		"resultExponent"=>0,
		"msg"=>""
	);
	$a = intval($_POST["a"]);
	$b = intval($_POST["b"]);
	$sign = urldecode($_POST["sign"]);
	switch ($_POST["sign"]) {
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

	$roundedResult = floor($result["result"]);
	if( strlen(  (string)$result["result"]  ) > $config["displayLength"] ){
		$result["msg"] = $config["TOOLONG"];

		echo json_encode($result);
		exit();
	}
	if($roundedResult!=$result["result"]){
		$result["msg"] = $config["ROUNDED"];
	}
	$result["result"] = $roundedResult;

	echo json_encode($result);
	exit();

}else{
	echo "error: wrong format (expects a, sign, b)";
}
?>
