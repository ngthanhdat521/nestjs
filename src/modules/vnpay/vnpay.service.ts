import { Request } from '@app/common/models/express.model';
import * as crypto from 'crypto';
import * as querystring from 'qs';
import * as moment from 'moment';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class VNPayService {
	createVNPayUrl(req: Request, res: Response) {
		try {
			const ipAddr =
				req.headers['x-forwarded-for'] ||
				req.connection.remoteAddress ||
				req.socket.remoteAddress;

			// const config = require('config');

			const tmnCode = 'CGXZLS0Z';
			const secretKey = 'XNBCJFAKAZQSGTARRLGCHVZWCIOIGSHN';
			let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
			const returnUrl = 'http://localhost:5000/v1/user';

			const date = new Date();

			const createDate = moment(date).format('yyyyMMDDHHmmss');
			const orderId = moment(date).format('HHmmss');
			const amount = req.body.amount || 2;
			const bankCode = req.body.bankCode || 'VNBANK';

			const orderInfo = req.body.orderDescription || 'Order item';
			const orderType = req.body.orderType || 'product';
			let locale = req.body.language || 'vn';
			if (locale === null || locale === '') {
				locale = 'vn';
			}
			const currCode = 'VND';
			let vnp_Params = {};
			vnp_Params['vnp_Version'] = '2.1.0';
			vnp_Params['vnp_Command'] = 'pay';
			vnp_Params['vnp_TmnCode'] = tmnCode;
			// vnp_Params['vnp_Merchant'] = ''
			vnp_Params['vnp_Locale'] = locale;
			vnp_Params['vnp_CurrCode'] = currCode;
			vnp_Params['vnp_TxnRef'] = orderId;
			vnp_Params['vnp_OrderInfo'] = orderInfo;
			vnp_Params['vnp_OrderType'] = orderType;
			vnp_Params['vnp_Amount'] = amount * 100;
			vnp_Params['vnp_ReturnUrl'] = returnUrl;
			vnp_Params['vnp_IpAddr'] = ipAddr;
			vnp_Params['vnp_CreateDate'] = createDate;
			if (bankCode !== null && bankCode !== '') {
				vnp_Params['vnp_BankCode'] = bankCode;
			}

			vnp_Params = this.sortObject(vnp_Params);
			const signData = querystring.stringify(vnp_Params, { encode: false });
			const hmac = crypto.createHmac('sha512', secretKey);
			const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
			vnp_Params['vnp_SecureHash'] = signed;

			vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
			// res.setHeader('Access-Control-Allow-Origin', '*');
			// res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
			// res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
			// res.setHeader('Access-Control-Allow-Credentials', 'true');
			// res.set('Content-Type', 'text/html');
			return res.redirect(vnpUrl);
		} catch (error) {
			throw new InternalServerErrorException(
				'Internal Server',
				'VNPay Error cannot be determined'
			);
		}
	}

	sortObject(obj) {
		const sorted = {};
		const str: any[] = [];
		let key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) {
				str.push(encodeURIComponent(key));
			}
		}
		str.sort();
		for (key = 0; key < str.length; key++) {
			sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
		}
		return sorted;
	}
}
