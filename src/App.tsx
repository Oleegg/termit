import { useEffect, useState } from 'react';
import './App.css';
import Content from './components/Content/Content';
import MyTable from './components/Table/MyTable';

export interface ITamble {
  message: string;
  container: number;
}


function App() {
  const [containerSize, setContainerSize] = useState<number | null>(null)
  // const [containerCount, setContainerCount] = useState(0)
  const [table, setTable] = useState<ITamble[]>([])
  const [containerNumber, setContainerNumber] = useState(containerSize ? 1 : 0)



  useEffect(() => {
    if (table.length && containerSize && table.length / containerNumber >= containerSize) {
      setContainerNumber(containerNumber + 1)
    }
  }, [table, containerSize, containerNumber])


  console.log('containerCount~~~~~~~~~~~~~~~', table.length % (containerSize || 1), containerNumber);

  return (
    <div className="App">
      <Content table={table} containerSize={containerSize} setTable={setTable} containerNumber={containerNumber} setContainerSize={setContainerSize} />
      <div className='main'>
        <MyTable table={table} />
        <div className='main__container'>
          <p>Строка состояния</p>
          <div>{`количество записей: ${table.length}`}</div>
          <div>{`количество контейнеров: ${table.length % (containerSize || 1) === 0
              ? containerNumber - 1 > 0
                ? containerNumber - 1
                : containerNumber
              : containerNumber
            }`}</div>
        </div>
      </div>

    </div>
  );
}

export default App;
