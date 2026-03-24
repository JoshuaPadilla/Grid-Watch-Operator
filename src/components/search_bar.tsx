import { Icons } from "../constants/icons.constant";

interface Props {
	query: string;
	onChangeQuery: (text: string) => void;
}

export const SearchBar = ({ query, onChangeQuery }: Props) => {
	return (
		<div className="my-4 rounded-2xl border border-slate-200/10 bg-slate-950/60 p-3 backdrop-blur-xl">
			<div className="flex items-center gap-3">
				<div className="rounded-lg border border-slate-200/10 bg-slate-900/80 p-2">
					<img src={Icons.search} className="size-4" />
				</div>
				<input
					value={query}
					onChange={(e) => onChangeQuery(e.target.value)}
					placeholder="Search title, body, or status..."
					className="grow border-none bg-transparent px-1 text-sm font-medium text-slate-100 outline-none placeholder:text-slate-400"
				/>
			</div>
		</div>
	);
};
