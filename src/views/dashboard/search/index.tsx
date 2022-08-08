import React from 'react'
import { PopupOverlay } from '../../../components/layout/PopupOverlay'
import PopupTitle from '../../../components/layout/PopupTitle'
import { Popupwrapper } from '../../../components/layout/Popupwrapper'

export default function SearchPage() {
  return (
    <>
    <Popupwrapper>
      <PopupTitle
        title={
         "Tìm kiếm"
        }
        backUrl={''}
      />
      <div>
        Search results go here
      </div>
    </Popupwrapper>
    <PopupOverlay />
  </>
  )
}
