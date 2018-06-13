// auto translate zh to zh-TW
const translate = require('google-translate-api')
const axios = require('axios')
async function main() {
	const { data: json } = await axios.get('https://unpkg.com/vue-cli-locale-zh/locales/zh.json')
	const fn = obj =>
		Promise.all(
			Object.keys(obj).map(async k => {
				if (typeof obj[k] != 'string') await fn(obj[k])
				else obj[k] = (await translate(obj[k], { to: 'zh-TW' })).text
			})
		)
	await fn(json)
	console.log(JSON.stringify(json))
}
main()
