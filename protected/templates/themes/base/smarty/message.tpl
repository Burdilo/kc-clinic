<!DOCTYPE html>
<html lang="ru">
<head>
	<meta content="width=device-width,initial-scale=1,user-scalable=no" name="viewport">
	<meta charset="utf-8">
</head>
<body>

<div style="padding:20px;background-color:#fffff7;font-family:Tahoma,Arial,sans-serif;font-size:15px;color:#424242">
	<div style="width:660px;margin:0 auto">
		<div style="margin-bottom:20px">
			<table style="font-size:15px">
				<tbody><tr style="line-height:1">
					<td style="width:46px;padding:0">
						<a href="http://{$domain}" target="_blank">
							<img src="http://{$domain}/images/mail_logo.png" width="46" height="46">
						</a>
					</td>
					<td style="width:20px;padding:0"></td>
					<td style="padding:0">
						<div style="color:#000;font-weight: bold;text-decoration:none;text-transform: uppercase;margin-bottom: 0;">{$domain}</div>
                        <div style="text-align:left;padding-top:16px;font-size:13px;color:#999;">{$subject}</div>
					</td>
				</tr>
			</tbody></table>
		</div>

		<div style="margin-bottom:20px;padding:50px 40px 50px 40px;background-color:#f2f2f2;color:#424242">
			<div style="font-size:25px;line-height:1.2em;color:#060606;margin-bottom:30px">{$subject}</div>
			<div style="font-size:25px;line-height:1.2em;color:#060606;margin-bottom:30px"></div>
			<div style="margin-bottom:60px">{$message|unescape}</div>
		</div>

		<div>
			<div style="text-align:left;padding-top:20px;font-size:13px;color:#424242;">
                <p>По всем вопросам Вы можете обратиться к нам</p>
				<p>Email: <a href="mailto:info@{$domain}" style="color:#755BCC;text-decoration:none" target="_blank">info@{$domain}</a></p>
				<p><a style="color:#755BCC" href="" target="_blank">Отписаться от рассылки</a></p>
            </div>
        </div>
	</div>
</div>

</body></html>