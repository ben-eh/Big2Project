type Attributes = {
	name: string;
	hand: string[];
	isCurrentPlayer: boolean;
}

const OtherPlayer = (attributes: Attributes) => {
	return (
		<div className="otherPlayerDivParent">
			<div>
				{attributes.name}
			</div>
			<div className={attributes.isCurrentPlayer ? 'activePlayerBackground' : ''}>
				{
					attributes.hand && attributes.hand.map((card) => {
						return(
							<img
								key={card}
								className="cardBack"
								src={'./assets/back_of_card.png'}
								alt="cardBacks" 
							/>
						)
					})
				}
			</div>
			<div>
				{  // this would potentially be the 'hidden' last card button
					attributes.isCurrentPlayer && (
						<p>Last card goes here</p>
					)
				}	
			</div>
		</div>
	)
}

export default OtherPlayer;