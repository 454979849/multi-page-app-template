// demo_index
// import '../css/demo1.styl'
// import '../css/demo2.scss'
import '../css/demo3.less'
import { getLanguageList } from '../utils/api/common'

$(async function () {
  // demo_api
  const data = await getLanguageList()
  if (!data) return false
  console.log(11,data)
})
