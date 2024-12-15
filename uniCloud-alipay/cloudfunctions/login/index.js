'use strict';
const {
	secret,
	appId,
} = require('hello-common')

const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		code
	} = event
	const res = await uniCloud.httpclient.request(
		"https://api.weixin.qq.com/sns/jscode2session?appid=" + appId + "&secret=" + secret +
		"&js_code=" + code + "&grant_type=authorization_code", {
			dataType: "json"
		}
	)
	const token = await uniCloud.httpclient.request(
		`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${secret}`, {
			dataType: "json"
		}
	)
	const openid = res.data.openid
	await db.collection('user').add({
		openid: openid,
		createTime: Date.now()
	})
	//返回数据给客户端
	return {
		openid,
		token
	}
}