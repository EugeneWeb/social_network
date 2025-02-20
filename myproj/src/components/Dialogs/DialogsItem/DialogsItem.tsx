import { FC } from 'react'
import s from './DialogsItem.module.css'
import { NavLink } from 'react-router-dom'
import { DialogType } from '../../../types/types'
import { baseServerUrl } from '../../../utils/baseServerUrl'

type PropsType = DialogType
export const DialogsItem: FC<PropsType> = ({id, path, name}) => {
    return (
        <li className={s.dialogsitem}>
            <NavLink to={`/messages/${id}`} className={({isActive}) => isActive ? `${s.active} ${s.dialog__link}` : s.dialog__link }>
                <div className={s.img__wrap}>
                    <img src={baseServerUrl + path} alt="Лого пользователя" />
                </div>
                <p>{name}</p>
            </NavLink>
        </li>
    )
}
