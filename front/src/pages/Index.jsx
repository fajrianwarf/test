import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import Form from '../components/Form';
import { useNavigate } from 'react-router-dom';

export default function Index() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [addNew, setAddNew] = useState(false);
  const [edit, setEdit] = useState({
    status: false,
    id: '',
  });
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    status: '',
  });
  const [error, setError] = useState('');

  const getData = async () => {
    await axios
      .get('http://localhost:3001/article')
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  const statusStyle = (item) => {
    if (item.status === 'draft') return 'text-blue-600';
    if (item.status === 'publish') return 'text-green-600';
    if (item.status === 'thrash') return 'text-red-600';
  };

  const toThrash = async (id) => {
    await axios
      .patch(`http://localhost:3001/article/${id}`, { status: 'thrash' })
      .then((res) => {
        console.log(res);
        Swal.fire('Success!', 'The data has been thrashed!', 'success');
        getData();
      });
  };

  const addData = async (e) => {
    e.preventDefault();
    await axios
      .post('http://localhost:3001/article', { ...formData })
      .then((res) => {
        console.log(res);
        if (res.data?.message) setError(res.data.message);
        if (res.data?.status === 'successfully added data') {
          Swal.fire('Success!', 'The data has been added!', 'success');
          setAddNew(false);
          setError('');
        }
      });
  };

  const editData = (item) => {
    setEdit({ status: true, id: item._id });
    setFormData({
      title: item.title,
      content: item.content,
      category: item.category,
      status: item.status,
    });
  };

  const sendEditData = async (e) => {
    e.preventDefault();
    await axios
      .patch(`http://localhost:3001/article/${edit.id}`, { ...formData })
      .then((res) => {
        console.log(res);
        if (res.data?.message) setError(res.data.message);
        if (res.data?.message === 'Data successfully updated') {
          Swal.fire('Success!', 'The data has been updated!', 'success');
          setEdit((prev) => ({ ...prev, status: false }));
          setError('');
          getData();
        }
      });
  };

  return (
    <div className='container'>
      <div className='px-8 py-4'>
        <h1 className='text-5xl mb-2'>Articles</h1>
        <button
          className='border px-2 py-1 rounded-md hover:bg-green-300'
          onClick={() => setAddNew(true)}
        >
          + Add new
        </button>
        {addNew && (
          <Form
            onSend={(e) => addData(e)}
            formData={formData}
            setFormData={setFormData}
            error={error}
            close={(e) => {
              e.preventDefault();
              setAddNew(false);
            }}
          />
        )}
        {edit.status && (
          <Form
            onSend={(e) => sendEditData(e)}
            formData={formData}
            setFormData={setFormData}
            error={error}
            edit={edit.status}
            close={(e) => {
              e.preventDefault();
              setEdit((prev) => ({ ...prev, status: false }));
            }}
          />
        )}
        <div className='my-4'>
          <div className='flex items-center gap-x-4 mb-4'>
            <h3 className='text-2xl '>All post</h3>
            <button
              className='px-2 py-1 border rounded-md hover:bg-blue-300'
              onClick={() => navigate('/preview', { state: data })}
            >
              preview
            </button>
          </div>
          <div className='grid grid-flow-row gap-y-4'>
            {!data ? (
              <p>No data</p>
            ) : (
              data.map((item) => (
                <div
                  key={item._id}
                  className='px-4 py-2 border rounded-md flex flex-col flex-wrap gap-y-2'
                >
                  <div className='flex justify-between items-center'>
                    <h4>Title : {item.title}</h4>
                    <div>
                      <button
                        className={`${
                          item.status === 'thrash' ? 'hidden' : ''
                        } text-red-400 border px-2 py-1 rounded-md hover:bg-red-300 hover:text-white`}
                        onClick={() => toThrash(item._id)}
                      >
                        thrash
                      </button>
                      <button
                        className='border rounded-md px-2 ml-2 py-1 hover:bg-green-300'
                        onClick={() => editData(item)}
                      >
                        edit
                      </button>
                    </div>
                  </div>
                  <p>{item.content}</p>
                  <div>
                    Status :
                    <span className={`${statusStyle(item)}`}>
                      {' '}
                      {item.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
