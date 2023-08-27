import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Image } from 'primereact/image';
const MovieDetail = (props: any) => {
    const { state } = useLocation();
    const [movieDetail, setMovieDetail]: any = useState();

    useEffect(() => {
        async function request() {
            const res = await fetch(`http://www.omdbapi.com/?i=${state}&apikey=e7483483`);
            const result = await res.json();
            setMovieDetail(result)
        }
        request();
    }, []);

    const movieDataForTable = [movieDetail]
    const imageBodyTemplate = (row: any) => {
        return <Image src={row?.Poster} width="100" className="w-6rem shadow-2 border-round" />;
    };

    return (
        <DataTable value={movieDataForTable} tableStyle={{ minWidth: '50rem' }}>
            <Column header="Poster" body={imageBodyTemplate}></Column>
            <Column field="Title" header="Title"></Column>
            <Column field="Actors" header="Actors"></Column>
            <Column field="Awards" header="Awards"></Column>
            <Column field="Director" header="Director"></Column>
            <Column field="Genre" header="Genre"></Column>
            <Column field="Released" header="Released"></Column>
            <Column field="Language" header="Language"></Column>
            <Column field="Runtime" header="Runtime"></Column>
            <Column field="Type" header="Type"></Column>
            <Column field="Writer" header="Writer"></Column>
            <Column field="imdbRating" header="IMBD Rating"></Column>

        </DataTable>
    )
}

export default MovieDetail