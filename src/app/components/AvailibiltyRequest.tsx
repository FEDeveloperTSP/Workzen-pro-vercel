import React from 'react'
import Search from './Search'
import SetRange from './SetRange'
import { Table } from 'antd'

const AvailibiltyRequest = () => {
  return (
      <div className='h-screen bg-white rounded-lg mt-4'>
          <div className='flex justify-between gap-4 md:gap-0 p-4 flex-col md:flex-row'>
              <div className='w-1/6 '>
                  <Search placeholder='Search in table..... ' className='shadow-md rounded-lg' />
              </div>
              {/* <CreateManager /> */}
              <SetRange/>
          </div>
          <div className="w-full overflow-x-auto">
              {/* <Table columns={columns} dataSource={datasource} pagination={false}  // Ensure horizontal scrolling */}
             
          </div>

      </div>
  )
}

export default AvailibiltyRequest
