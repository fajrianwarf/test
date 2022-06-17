import React from 'react';
import { useLocation, Link } from 'react-router-dom';
export default function Preview() {
  const { state } = useLocation();
  return (
    <div className='container px-6 py-4'>
      <div className='flex justify-between mb-6'>
        <h1 className='text-2xl'>Published content</h1>
        <button className='border px-2 py-1 hover:bg-green-300'>
          <Link to='/'>Go back</Link>
        </button>
      </div>
      {state
        .filter((item) => item.status === 'publish')
        .map((item) => (
          <div
            key={item._id}
            className='px-4 py-2 border rounded-md flex flex-col flex-wrap gap-y-2'
          >
            <h4>Title : {item.title}</h4>
            <p>{item.content}</p>
            <div>
              Status :<span className='text-green-600'> {item.status}</span>
            </div>
          </div>
        ))}
    </div>
  );
}
