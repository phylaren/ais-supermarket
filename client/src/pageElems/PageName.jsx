import style from './PageName.module.css';

export default function PageName({name}) {
    return (
        <header className={style.header}>{name}</header>
    )
}