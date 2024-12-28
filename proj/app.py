from flask import Flask, jsonify
import smtplib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/mail', methods=['GET'])
def mail():
    try:
        server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
        email_addr = '727722eucs100@skcet.ac.in'
        email_passwd = 'bjiv jruw pxsi gvko'
        server.login(email_addr, email_passwd)
        account = 'manoat7575@gmail.com'
        msg = "Subject: Booking Confirmation\n\nYou are Booked"
        server.sendmail(from_addr=email_addr, to_addrs=account, msg=msg)
        server.close()
        return jsonify({'message': 'Email sent successfully'}), 200
    except Exception as e:
        return jsonify({'message': f'Failed to send email: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
