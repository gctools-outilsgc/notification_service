function notifications(_, args, context, info){
    whereData={where:{}}
    whereData.where={for: args.for}
    if (args.viewed !== undefined){
        whereData.where.push({online:{viewed:args.viewed}})
    }
    return context.prisma.query.notifications(
        {
            whereData,
            skip: args.skip,
            first: args.first,
        },
        info
    )
}

module.exports = {
    notifications,
}