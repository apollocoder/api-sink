const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const fs = require('fs')

const app = new Koa()
const port = 8040

app.use(bodyParser())

app.use(async ctx => {
	const date = new Date().toISOString()
	fs.writeFile(
		'data/' +
			date.replaceAll('-', '').replaceAll(':', '').replaceAll('.', '') +
			'.json',
		JSON.stringify(ctx.request.body),
		() => {}
	)
	console.log(date, ctx.request.URL.pathname, ctx.request.body ?? '')
	ctx.status = 204
})

console.log(`listening on port ${port}...`)
app.listen(port)
