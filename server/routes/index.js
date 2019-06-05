const Router = require('koa-router')
const mongoose = require('mongoose')
const router = new Router()

// 查询用户
router.get('/user/:name', async (ctx, next) => {
  const name = ctx.params.name
  const userDB = mongoose.model('User')
  const user = await userDB.findOne({username: name})

  ctx.body = {
    'data': {
      user
    }
  }
})

router.get('/', async (ctx, next) => {
  ctx.redirect('/jobs/list');
});

// 职位列表
router.get('/jobs/list', async (ctx, next) => {
  const curPage = Number(ctx.query.page)
  const pageSize = 10
  const Job = mongoose.model('Job')
  const total = await Job.find({}).count()
  const totalPage = Math.floor((total + pageSize - 1) / pageSize)
  const hasNextPage = curPage < totalPage ? true : false
  const jobs = await Job.find({}).sort({
    'meta.createdAt': -1
  }).skip((curPage - 1) * pageSize).limit(pageSize)

  ctx.body = {
    'data': {
      jobs,
      'pages': {
        curPage,
        totalPage,
        hasNextPage,
        total
      }
    }
  }
})

// 公司列表
router.get('/company/list', async (ctx, next) => {
  const curPage = Number(ctx.query.page)
  const pageSize = 10
  const Company = mongoose.model('Company')
  const total = await Company.find({}).count()
  const totalPage = Math.floor((total + pageSize - 1) / pageSize)
  const hasNextPage = curPage < totalPage ? true : false
  const companies = await Company.find({}).sort({
    'meta.createdAt': -1
  }).skip((curPage - 1) * pageSize).limit(pageSize)

  ctx.body = {
    'data': {
      companies,
      'pages': {
        curPage,
        totalPage,
        hasNextPage,
        total
      }
    }
  }
})

router.get('/companyDetail/list/:page', async (ctx, next) => {
  const curPage = Number(ctx.params.page)
  const pageSize = 10
  const Company = mongoose.model('CompanyDetail')
  const total = await Company.find({}).count()
  const totalPage = Math.floor((total + pageSize - 1) / pageSize)
  const hasNextPage = curPage < totalPage ? true : false
  const companies = await Company.find({}).sort({
    'meta.createdAt': -1
  }).skip((curPage - 1) * pageSize).limit(pageSize)

  ctx.body = {
    'data': {
      companies,
      'pages': {
        curPage,
        totalPage,
        hasNextPage,
        total
      }
    }
  }
})

router.get('/companyDetail', async (ctx, next) => {
  const name = String(ctx.query.name)
  console.log(name)
  const Company = mongoose.model('CompanyDetail')
  const companyDetail = await Company.findOne({name: name})

  ctx.body = {
    'data': {
      companyDetail
    }
  }
})

module.exports = router