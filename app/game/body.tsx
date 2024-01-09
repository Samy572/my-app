'use client';
import { GameCardType } from '@/src/types/game';
import Displayplatforms from '@/src/components/displayplatforms';
import { Badge } from '@/src/components/ui/badge';
import Favoris from './favoris';
import useFavoris from '@/hooks/useFavoris';
import { Button } from '@/src/components/ui/button';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const Body = ({ selectedGameData }: { selectedGameData: GameCardType }) => {
	const { handleAddFavoris, listFavorite } = useFavoris();
	console.log('selectedGameData :', selectedGameData);
	const website = selectedGameData.website;

	return (
		<div className="text-left pt-5 text-4xl">
			<div className="flex justify-between">
				<h2 className="pb-5 text-primary font-semibold">
					{selectedGameData.name}
				</h2>
				{selectedGameData.website && (
					<Button
						className="z-10"
						aria-label="Go to website"
						tabIndex={0}
						variant={'outline'}
						title="Go to website"
					>
						<Link
							href={website === selectedGameData.website ? website : ''}
							target={'_blank'}
						>
							<ArrowUpRight />
						</Link>
					</Button>
				)}
			</div>
			<div className="flex  items-center">
				<span className=" text-xl">
					Released: {selectedGameData && selectedGameData.released}
				</span>
			</div>
			<div className="flex justify-between">
				<div className="flex items-center gap-1">
					{selectedGameData &&
						selectedGameData.genres.slice(0, 2).map((genre) => (
							<Badge
								variant={'secondary'}
								key={genre.id}
								className="w-fit text-primary"
							>
								{genre.name}
							</Badge>
						))}
				</div>
				<Displayplatforms
					platforms={selectedGameData && selectedGameData.platforms}
					img="../img"
				/>
			</div>
			<Favoris
				onClick={() => handleAddFavoris(selectedGameData)}
				description={
					listFavorite.some((item: any) => item.id === selectedGameData.id)
						? 'Remove from favoris'
						: 'Add to favoris'
				}
				img={
					listFavorite.some((item: any) => item.id === selectedGameData.id)
						? '../img/Star_full.svg'
						: '../img/Star_empty.svg'
				}
			/>
		</div>
	);
};
export default Body;
