// auto translate zh to zh-TW
const translate = require('google-translate-api')
const xf = require('xfetch-js')

const SC2TC = new Map([
	['項目', '專案'],
	['改動', '修改'],
	['二進製', '二進位'],
	['信息', '訊息'],
	['刷新', '重新整理'],
	['添加', '新增'],
	['創建', '新增'],
	['新建', '新增'],
	['文件夾', '資料夾'],
	['文件', '檔案'],
	['日誌', '紀錄'],
	['配置', '設定'],
	['設置', '設定'],
	['默認', '預設'],
	['反饋', '回報'],
	['卸載', '移除'],
	['導入', '匯入'],
	['鏈接', '連結'],
	['字符串', '字串'],
	['運行', '執行'],
	['遠程', '遠端'],
	['自定義', '自訂'],
	['程序', '程式'],
	['質量', '品質'],
	['代碼', '程式碼'],
	['糾錯', '偵錯'],
	['資產', '資源'],
	['搜索', '搜尋'],
	['斷開', '中斷'],
	['配置','設定'],
	['源地圖', 'Source Map'],
	['模塊', 'Module'],
	['倉庫', 'Repository']
])
const insertSpaceBetweenEnglishAndChinese = str => {
	const p1 = /([A-Za-z_])([\u4e00-\u9fa5]+)/gi
	const p2 = /([\u4e00-\u9fa5]+)([A-Za-z_])/gi
	return str.replace(p1, '$1 $2').replace(p2, '$1 $2')
}
const textReplace = t => {
	for (const [from, to] of SC2TC) {
		t = t.replace(from, to)
	}
	return insertSpaceBetweenEnglishAndChinese(t)
}

async function main() {
	const json = await xf.get('https://unpkg.com/vue-cli-locale-zh/locales/zh.json').json()
	const fn = obj =>
		Promise.all(
			Object.keys(obj).map(async k => {
				if (typeof obj[k] != 'string') await fn(obj[k])
				else obj[k] = await translate(obj[k], { to: 'zh-TW' }).then(({ text }) => textReplace(text))
			})
		)
	await fn(json)
	console.log(JSON.stringify(json))
}
main()
