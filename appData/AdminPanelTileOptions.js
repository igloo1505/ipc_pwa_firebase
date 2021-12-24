/* eslint-disable import/no-anonymous-default-export */

const adminTileOptions = [
	{
		id: "addNewAdministrator",
		title: "Add new administrator",
		// action: ({router}) => router.push("/admin/add-new-administrator"),
	},
	{
		id: "addNewCarouselEvent",
		title: "Create new carousel event",
		action: ({ router }) =>
			router.push("/pastorPeople/carouselEvents/addEvent"),
	},
];

export default adminTileOptions;
