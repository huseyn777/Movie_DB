import { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { useNavigate } from "react-router-dom";
import tableState from "./Atom";
import { useSetRecoilState, useRecoilValue } from "recoil";

const MovieTable = () => {
    const navigate = useNavigate();
    const setTableState: any = useSetRecoilState(tableState);
    const getTableState: any = useRecoilValue(tableState);

    const [tableValue, setTableValue]: any = useState([]);
    const [movieTitle, setMovieTitle]: any = useState(getTableState.length !== 0 ? getTableState[0] : "Pokemon");
    const [lazyState, setlazyState] = useState(getTableState.length !== 0 ? getTableState[1] : {
        first: 0,
        rows: 10,
        page: 0,
    });
    const [type, setType]: any = useState(getTableState.length !== 0 ? getTableState[2] : "");
    const [date, setDate] = useState(getTableState.length !== 0 ? getTableState[3] : null);
    const [inputTypeValue, setInputTypeValue]: any = useState(getTableState.length !== 0 ? getTableState[0] : "Pokemon");
    const [buttonLoading, setButtonLoading] = useState(false);
    const [typeOptions] = useState(['movie', 'series', 'episode']);
    const [totalRecords, setTotalRecords]: any = useState(0);
    const [inputDateValue, setInputDateValue]: any = useState();

    useEffect(() => {
        async function request() {
            setTableState([])
            const res = await fetch(`http://www.omdbapi.com/?s=${movieTitle}&page=${lazyState.page + 1}&type=${type}&y=${date}&apikey=e7483483`);
            const result = await res.json();
            setTableValue(result.Search);
            setTotalRecords(result.totalResults);
            setButtonLoading(false);
        }
        request();

    }, [movieTitle, lazyState, type, date]);

    const imageBodyTemplate = (row: any) => {
        return <Image src={row.Poster} width="100" className="w-6rem shadow-2 border-round" />;
    };

    const onPage = (event: any) => {
        setlazyState(event);
    };

    const header = () => {
        return (
            <div style={{ display: "flex" }} >
                <div><InputText value={inputTypeValue} onChange={(e) => setInputTypeValue(e.target.value)} /></div>
                <div style={{ marginLeft: "2%" }}>
                    <Button label="Search" loading={buttonLoading} onClick={() => {
                        setMovieTitle(inputTypeValue);
                        setButtonLoading(true);
                        setlazyState({
                            first: 0,
                            rows: 10,
                            page: 0,
                        });
                    }} />
                </div>
            </div>
        );
    };

    const typeFilterTemplate = (options: any) => {
        return (
            <Dropdown value={type ? type : options.value} options={typeOptions}
                onChange={(e) => {
                    setType(e.value); options.filterApplyCallback(e.value);
                    setlazyState({
                        first: 0,
                        rows: 10,
                        page: 0,
                    });
                }}
                placeholder="Select One" className="p-column-filter" style={{ minWidth: '12rem' }} />
        );
    };

    const dateFilterTemplate = () => {
        return (
            <div style={{ display: "flex" }} >
                <div><InputNumber placeholder="Input the year" format={false} maxLength={4} value={date ? date : inputDateValue} onValueChange={(e) => setInputDateValue(e.target.value)} /></div>
                <div style={{ marginLeft: "2%" }}><Button label="Apply" onClick={() => {
                    setlazyState({
                        first: 0,
                        rows: 10,
                        page: 0,
                    })
                    setDate(inputDateValue);
                }} /></div>
            </div>
        );
    }

    const rowSelection = (row: any) => {
        setTableState([movieTitle, lazyState, type, date])

        navigate("/movieDetail", { state: row.value.imdbID })
    }

    return (
        <DataTable value={tableValue} tableStyle={{ minWidth: '50rem' }} header={header}
            lazy paginator first={lazyState.first} rows={10} totalRecords={totalRecords}
            onPage={onPage} paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
            filterDisplay="row" selectionMode="single"
            onSelectionChange={rowSelection}
        >

            <Column header="Poster" body={imageBodyTemplate}></Column>
            <Column field="imdbID" header="ID"></Column>
            <Column field="Title" header="Title"></Column>
            <Column field="Type" header="Type" onFilterClear={() => {
                setType("");
                setlazyState({
                    first: 0,
                    rows: 10,
                    page: 0,
                });
            }} showFilterMenu={false} filter filterElement={typeFilterTemplate}></Column>
            <Column field="Year" header="Year" dataType="numeric" filter showFilterMenu={false} filterElement={dateFilterTemplate}></Column>
        </DataTable>
    )
}

export default MovieTable;