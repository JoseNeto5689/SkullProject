import smtplib
import email.message


def enviar_email():
    # html do email
    corpo_email = """ 
    <p>E ta funcionando</p>
    """

    msg = email.message.Message()
    msg['Subject'] = "Testando envio de email com python"  # Titulo do email
    # Email do remetente
    msg['From'] = ''
    # Adicionar para quem deve ser enviado, para mais de uma pessoa, deve separar os emails na string com ,
    msg['To'] = ''
    # Adicionar senha de app do google
    password = ''
    msg.add_header('Content-Type', 'text/html')
    msg.set_payload(corpo_email)

    s = smtplib.SMTP('smtp.gmail.com: 587')
    s.starttls()
    s.login(msg['From'], password)
    s.sendmail(msg['From'], [msg['To']], msg.as_string().encode('utf-8'))
    print('ok', end="")


enviar_email()
