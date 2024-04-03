const { Op } = require('sequelize');
const db = require('../model/index')
const User = db.user
const Booking = db.booking
const { sendReminderEmail } = require('../utils/sendEmail')
async function scheduleBookingStatusUpdate() {
    setInterval(async () => {
        try {
            const currentTime = new Date();
            const oneHourAgo = new Date(currentTime.getTime() - 60 * 60 * 1000);

            const pendingBookings = await Booking.findAll({
                where: {
                    statusBooking: 'Pending',
                    createdAt: {
                        [Op.lte]: oneHourAgo
                    }
                }
            });

            for (const booking of pendingBookings) {
                await booking.update({ statusBooking: 'Cancelled' });
            }

            console.log(`Updated ${pendingBookings.length} bookings.`);
        } catch (error) {
            console.error("Error updating booking statuses:", error);
        }
    }, 30 * 30 * 1000);
}

async function checkAndHandleCancelledBookings() {
    try {
        const cancelledBookingsThreshold = 3;
        const banThreshold = 4;

        const currentTime = new Date();
        currentTime.setDate(currentTime.getDate() - 30);

        const cancelledBookings = await Booking.findAll({
            where: {
                statusBooking: 'Cancelled',
                createdAt: {
                    [Op.gte]: currentTime
                }
            }
        });

        const cancelledUsers = cancelledBookings.map(booking => booking.userId);

        const userCancellationCounts = {};
        cancelledUsers.forEach(userId => {
            userCancellationCounts[userId] = (userCancellationCounts[userId] || 0) + 1;
        });


        for (const userId in userCancellationCounts) {
            console.log('userId: ', userId)
            const cancellationCount = userCancellationCounts[userId];
            console.log('cancellationCount: ', cancellationCount)
            if (cancellationCount === cancelledBookingsThreshold) {
                const user = await User.findOne({
                    where: {
                        id: userId
                    }
                })

                sendReminderEmail(user.email, cancellationCount);
            } else if (cancellationCount >= banThreshold) {
                await banUserAccount(userId);
            }
        }
    } catch (error) {
        console.error("Error checking and handling cancelled bookings:", error);
    }
}

function scheduleCheckCancelledBookings() {
    setInterval(async () => {
        await checkAndHandleCancelledBookings();
    }, 30 * 30 * 1000);
}



async function banUserAccount(userId) {
    try {
        const userBanned = await User.findOne({
            where: { id: userId }
        });

        if (userBanned) {
            await userBanned.update({
                status: "InActive"
            });
            console.log(`User with ID ${userId} has been banned.`);
        } else {
            console.log(`User with ID ${userId} not found.`);
        }
    } catch (error) {
        console.error("Error banning user account:", error);
        throw error;
    }
}



module.exports = {
    scheduleBookingStatusUpdate,
    scheduleCheckCancelledBookings
}