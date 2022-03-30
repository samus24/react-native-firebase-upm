export const dwCardLayout = [
	{
		paddingTop: 8,
		paddingLeft: 16,
		minHeight: 85,
		flexDirection: 'row',
		alignItems: "flex-start",
		children: [
			{
				width: 60,
				height: 60,
				borderRadius: 30,
			},
			{
				height: 30,
				width: '80%',
				paddingLeft: 10,
				flexDirection: 'column',
				alignItems: "flex-start",
				children: [
					{
						width: '100%',
						marginTop: 8,
						height: 25,
					},
					{
						width: '100%',
						marginTop: 8,
						height: 20,
					},
				],
			},
		]
	},
	{
		flexDirection: 'column',
		children: [
			{
				width: "100%",
				height: 150,
				marginBottom: 10,
			},
			{
				width: '80%',
				height: 20,
				marginHorizontal: 10,
				marginBottom: 10,
			},
			{
				width: '100%',
				flexDirection: 'row',
				marginHorizontal: 10,
				children: [
					{
						width: '40%',
						height: 30,
						marginRight: 50,
					},
					{
						width: '40%',
						height: 30,
						borderRadius: 50,
					},
				],
			},
		]
	},
];

export const dwCardSimpleLayout = [
    {
        minHeight: 85,
        flexDirection: 'row',
        alignItems: "flex-start",
        children: [
            {
                height: 125,
                width: '95%',
                paddingHorizontal: 5,
                flexDirection: 'column',
                alignItems: "flex-start",
                children: [
                    {
                        width: '100%',
                        marginTop: 8,
                        height: 20,
                    },
                    {
                        width: '100%',
                        marginTop: 8,
                        height: 10,
						marginBottom: 10,
                    },
					{
						width: '80%',
						height: 10,
						marginHorizontal: 10,
						marginBottom: 5,
					},
					{
						width: '80%',
						height: 10,
						marginHorizontal: 10,
						marginBottom: 5,
					},
					{
						width: '50%',
						height: 15,
						marginHorizontal: 10,
						marginBottom: 5,
					},
					{
						width: '50%',
						height: 10,
						marginHorizontal: 10,
						marginBottom: 5,
					},
                ],
            },
        ]
    },
];

export const movementSkeletonLayout = [
    {
        minHeight: 85,
        flexDirection: 'row',
        alignItems: "flex-start",
        children: [
            {
                height: 85,
                width: '95%',
                paddingHorizontal: 5,
                flexDirection: 'row',
                alignItems: "flex-start",
                children: [
                    {
                        width: '20%',
                        marginTop: 8,
                        height: 40,
						alignSelf: 'center'
                    },
					{
						width: '80%',
						height: 40,
						flexDirection: 'column',
						alignSelf: 'center',
						marginHorizontal: 10,
						children: [
							{
								width: '100%',
								height: 25,
								marginBottom: 5,
							},
							{
								width: '80%',
								height: 10,
								marginBottom: 5,
							},
						]
					}
                ],
            },
        ]
    },
];