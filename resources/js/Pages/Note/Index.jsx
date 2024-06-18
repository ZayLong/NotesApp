import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head } from '@inertiajs/react';

export default function Index({ errors, auth, notes }) {
    return (

<>
            <Head title="Notes" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        ALL NOTES
                        {
                            notes && (
                                notes.data.map((note_object) => {
                                    return <div className="-mx-3 card">{note_object.note}</div>
                                })
                            )
                        }
                    </div>
                </div>
            </div>
    </>
    );
}
