import { ITamble } from '../../App';
import './MyTable.css';

const MyTable = ({ table }: { table: ITamble[] }) => {

    return (
        <div>
            <table>
                <tr>
                    <th>Сообщение</th>
                    <th>Контейнер</th>
                </tr>
                {table && table.length && table.map((el, i) => {
                    return (
                        <tr key={i}>
                            <td>{el.message}</td>
                            <td>{el.container}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}

export default MyTable