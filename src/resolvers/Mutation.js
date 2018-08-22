const mailer = require('../mailer/mailer')


async function createNotification(_, args, context, info){
    const data = {}
    if (args.email == undefined && args.online == undefined){
        throw new Error("A notification must be created with either Email or Online information")
    }
    data.for = args.for

    if (args.email !== undefined){
        data.email = {
            create:{
                from: args.email.from,
                to: {
                    set: args.email.to
                },
                subject: args.email.subject,
                body: args.email.body,
                html: args.email.html,
                status: "Sent" 
            }
        }   
        /* const send_error = await mailer.sendEmail(context, data.email)
        if (send_error !== undefined) {
            data.email.error = sent_error
            data.email.status = "Queued"
        } else {
            data.email.status = "Sent"
        }*/
    } 

    if (args.online !== undefined){
        data.online = {
             create:{
                titleEn: args.online.titleEn,
                titleFr: args.online.titleFr,
                descriptionEn: args.online.descriptionEn,
                descriptionFr: args.online.descriptionFr
            }
        }
    }
    
    return await context.prisma.mutation.createNotification({
        data: data
    }, info)
}

async function updateNotification(_, args, context, info){
    const notification = await context.prisma.query.notification(
        {
            where:{
                id: args.id
            }
        }
    )
    if (notification == null | undefined){
        throw new Error('Could not find notificaiton with id ${args.id}')
    }
    
    var updatedOnline = {}

    if (args.online.titleEn !== undefined){
        updatedOnline.titleEn = args.online.titleEn
    }

    if (args.online.titleFr !== undefined){
        updatedOnline.titleFr = args.online.titleFr
    }

    if (args.online.descriptionEn !== undefined){
        updatedOnline.descriptionEn = args.online.descriptionEn
    }

    if (args.online.descriptionFr !== undefined){
        updatedOnline.descriptionFr = args.online.descriptionFr
    }

    if(args.online.viewed !== undefined){
        updatedOnline.viewed = args.online.viewed
    }
    updatedOnline={online:{update:updatedOnline}}

    return await context.prisma.mutation.updateNotification({
        where:{
            id: args.id
        },
        data: updatedOnline
    }, info)
}



module.exports = {
    createNotification,
    updateNotification,
}