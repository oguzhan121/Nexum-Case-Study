
export default function ListHeader({searchKey,count}) {
    return (
        <div className="app-list-header">
            <div className="list-info">
                <div className="results">{searchKey} için Sonuçlar</div>
                <div className="count">{count} film bulundu</div>
            </div>
        </div>
    );
}
