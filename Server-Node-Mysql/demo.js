import axios from 'axios';
const empListData = []
axios.get('http://dummy.restapiexample.com/api/v1/employees').then(res => {

    res.map((empData => {
        getEmpDetails(res)
    }))

})

async function getEmpDetails(res) {

    let data = await axios.get(`http://dummy.restapiexample.com/api/v1/employee/${empData.id}`)

    empListData.push(data)


}
console.log('emp list data = == ', empListData)