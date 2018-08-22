function notifications(_, args, context, info){
    return context.prisma.query.notifications(
        {
            where:{
                for: args.for,
                online: {
                    viewed: args.viewed
                }
            },
            skip: args.skip,
            first: args.first,
        },
        info
    )
}

module.exports = {
    notifications,
}