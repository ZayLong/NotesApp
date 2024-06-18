
import clsx from 'clsx'
import {PaginationState} from '../../../_metronic/helpers'
import {useMemo} from 'react'

const mappedLabel = (label: string): string => {
    if (label === '&laquo; Previous') {
        return 'Previous'
    }

    if (label === 'Next &raquo;') {
        return 'Next'
    }
    return label
}

function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
// @ts-ignore
const Pagination = ({pagination,setUrl}) => {


    const paginationLinks = useMemo(() => pagination.links, [pagination])

    return (
        <div className='row'>
            <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
                <div id='kt_table_users_paginate'>
                    <ul className='pagination'>
                        <li
                            className={clsx('page-item', {
                                disabled: pagination.current_page === pagination.from,
                            })}
                        >
                            <a onClick={() => setUrl(pagination.first_page_url)}  style={{cursor: 'pointer'}} className="page-link">
                                First
                            </a>
                        </li>
                        {paginationLinks
                            .map((link:any) => {
                                return {...link, label: mappedLabel(link?.label)}
                            })
                            .map((link:any) => (
                                <li
                                    key={link.label === '...' ? generateUniqueId() : link.label}
                                    className={clsx('page-item', {
                                        active: pagination.active,
                                        disabled: link.label === 'Previous' && pagination.current_page === pagination.from || link.label === 'Next' && pagination.current_page === pagination.last_page || link.url === null,
                                        previous: link.label === 'Previous',
                                        next: link.label === 'Next',
                                    })}
                                >
                                    <a
                                        className={clsx('page-link', {
                                            'page-text': link.label === 'Previous' || link.label === 'Next',
                                            'me-5': link.label === 'Previous',
                                        })}
                                        onClick={() => setUrl(link.url)}
                                        style={{cursor: 'pointer'}}
                                    >

                                        {
                                            mappedLabel(link.label) === 'Next' || mappedLabel(link.label) === 'Previous' ? (
                                                <i className={link.label.toLowerCase()}></i>
                                            ):(
                                                 mappedLabel(link.label)
                                            )



                                        }

                                    </a>
                                </li>
                            ))}
                        <li
                            className={clsx('page-item', {
                                disabled: pagination.current_page === pagination.last_page,
                            })}
                        >
                            <a
                                onClick={() => setUrl(pagination.last_page_url)}
                                style={{cursor: 'pointer'}}
                                className='page-link'
                            >

                                Last
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default  Pagination;
