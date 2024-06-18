import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Modal from '@/Components/Modal'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from "@/Components/TextInput";
import DangerButton from "@/Components/DangerButton.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import Pagination from "@/Components/Pagination"
import {KTCard,KTCardBody} from "../../_metronic/helpers";


export default function Dashboard({auth}) {
    const [data, setData] = useState({data: []});
    const [url, setUrl] = useState(import.meta.env.VITE_CRUD_ENDPOINT);
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)
    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const [noteIdToDelete, setNoteIdToDelete] = useState(0)
    const [noteIdToUpdate, setNoteIdToUpdate] = useState(0)
    const [newNoteText, setNewNoteText] = useState('')
    const [modalText, setModalText] = useState('')

    useEffect(() => {
        getNotePage()
    }, [url]);

    const  getNotePage = () => {
        const fetchData = async () => {
            const result = await axios(url);
            setData(result.data);
        };
        fetchData();

    }

    const showCreateModal = () => {
        setIsCreateModalVisible(true)

    }

    const createNote = () => {
        const fetchData = async () => {
            const result = await axios.post('/notes/create', {
                user_id: auth.user.id,
                note: newNoteText
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        fetchData();
    }

    const updateNote = (id) => {
        const fetchData = async () => {
            const result = await axios.put(`/notes/update/${id}`, {
                user_id: auth.user.id,
                note: newNoteText
            })
                .then(function (response) {
                    console.log(response);
                    getNotePage()
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        fetchData();
        setNoteIdToUpdate(0)
        setIsEditModalVisible(false)
        setNewNoteText('')
    }

    const onChange = (e) => {
        setNewNoteText(e.target.value)
    }

    const showUpdateModal = (id) => {
        // load note into modal text area
        let noteText = data.data.filter((note) => note.id === id)
        if (!noteText) return
        setNewNoteText(noteText[0].note)
        setIsEditModalVisible(true)
        setNoteIdToUpdate(id)
    }

    const showDeleteModal = (id) => {
        setNoteIdToDelete(id)
    }

    const deleteNote = (id) => {
        const fetchData = async () => {
            const result = await axios.delete(`/notes/delete/${id}`)
                .then(function (response) {
                    console.log(response);
                    setNoteIdToDelete(0)
                    getNotePage()
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        fetchData();
    }

// Helper function to chunk array
    function chunkArray(myArray, chunk_size){
        let index = 0;
        let arrayLength = myArray.length;
        let tempArray = [];

        for (index = 0; index < arrayLength; index += chunk_size) {
            let chunk = myArray.slice(index, index+chunk_size);
            tempArray.push(chunk);
        }

        return tempArray;
    }
    let chunkedData = chunkArray(data.data, 4);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard"/>
            <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className=" text-gray-900">You're logged in!</div>
                        <button onClick={() => showCreateModal()} type="button" className="btn btn-sm explore-btn-primary">Create Note
                            </button>
                        <div>
                            {
                                chunkedData.map((chunk,index) => (
                                    <div className="row" key={index} style={{margin:'20px', justifyContent:'center'}}>
                                        {
                                        chunk.map((item,index) => (
                                        <KTCard shadow={true} flush={false} border={true} className="w-300px col-3"
                                                key={index}>
                                            <div className="card-header">
                                                <div className="card-toolbar">
                                                    <button type="button" className="btn btn-sm explore-btn-primary"
                                                            onClick={() => showUpdateModal(item.id)}>
                                                        Edit
                                                    </button>
                                                    <button type="button" className="btn btn-sm btn-danger"
                                                            onClick={() => showDeleteModal(item.id)}>
                                                        Trash
                                                    </button>
                                                </div>
                                            </div>
                                            <KTCardBody scroll={true} height={200}>
                                                {item.note}
                                            </KTCardBody>
                                        </KTCard>
                                        ))
                                        }
                                    </div>
                                ))
                            }
                        </div>
                            {data.links && (
                                <Pagination pagination={data} setUrl={setUrl} />
                        )
                        }

                        <Modal show={isCreateModalVisible} onClose={() => setIsCreateModalVisible(false)} className="w-auto">
                            <KTCard >
                                <div className="p-12 card-footer">
                                    <DangerButton onClick={() => setIsCreateModalVisible(false)}><span className="text-white">Cancel </span></DangerButton>
                                    <SecondaryButton onClick={() => updateNote()}><span className="text-white">Save</span></SecondaryButton>
                                </div>
                                <KTCardBody>
                                    <div className="input-group h-250px" >
                                        <span className="input-group-text">Note</span>
                                        <textarea value={newNoteText} onChange={(e) => onChange(e)} className="form-control" aria-label="note textarea" ></textarea>
                                    </div>
                                </KTCardBody>
                            </KTCard>
                        </Modal>

                        <Modal show={isEditModalVisible} onClose={() => setIsEditModalVisible(false)} className="w-auto">
                            <KTCard >
                                <div className="p-12 card-footer">
                                    <DangerButton onClick={() => setIsEditModalVisible(false)}><span
                                        className="text-white">Cancel </span></DangerButton>
                                    <SecondaryButton onClick={() => updateNote(noteIdToUpdate)}><span
                                        className="text-white">Save Edit </span></SecondaryButton>
                                </div>
                                <KTCardBody>
                                <div className="input-group h-250px" >
                                    <span className="input-group-text">Note</span>
                                    <textarea value={newNoteText} onChange={(e) => onChange(e)} className="form-control" aria-label="With textarea" ></textarea>
                                </div>
                                </KTCardBody>
                            </KTCard>
                        </Modal>

                        <Modal show={noteIdToDelete > 0} onClose={() => setNoteIdToDelete(0)}>
                            <KTCard>
                                <div className="p-12">
                                    <div className="card-header">
                                        <KTCardBody>
                                            <div className="alert alert-danger d-flex align-items-center p-5">
                                                <i className="ki-duotone ki-shield-tick fs-2hx text-danger me-4"><span
                                                    className="path1"></span><span className="path2"></span></i>

                                                <div className="d-flex flex-column">
                                                    <h4 className="mb-1 text-danger-emphasis">Final Confirmation!</h4>
                                                    <span>You won't be able to get it back!</span>
                                                </div>

                                            </div>
                                        </KTCardBody>
                                    </div>
                                    <div className="card-footer">
                                        <div className="card-toolbar d-flex flex-row flex-center">
                                            <DangerButton

                                                className="col-3 m-3 "
                                                onClick={() => deleteNote(noteIdToDelete)}><span className="text-white">DELETE <i className="ki-trash"></i></span></DangerButton>
                                            <SecondaryButton
                                                className="col-3 m-3 text-white"
                                                onClick={() => setNoteIdToDelete(0)}><span className="text-white">Cancel</span></SecondaryButton>
                                        </div>
                                    </div>

                                        </div>
                            </KTCard>
                        </Modal>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}



// <button onClick={() => setUrl(data.prev_page_url)} disabled={!data.prev_page_url}>Previous
// </button>
// <button onClick={() => setUrl(data.next_page_url)} disabled={!data.next_page_url}>Next
// </button>
// return (
//     <AuthenticatedLayout
//         user={auth.user}
//         header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
//     >
//         <Head title="Dashboard" />
//
//         <div className="py-12">
//             <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
//                 <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
//                     <div className="p-6 text-gray-900">You're logged in!</div>
//                 </div>
//             </div>
//         </div>
//     </AuthenticatedLayout>
// );
// <div key={item.id}>
//     <SecondaryButton onClick={() => showUpdateModal(item.id)}>Edit</SecondaryButton>
//     <DangerButton onClick={() => showDeleteModal(item.id)}>Trash</DangerButton>
//     <p>{item.note}</p>
