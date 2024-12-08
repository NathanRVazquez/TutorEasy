const { PrismaClient, UserType } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

async function main() {
  try {
    // Clear existing data (optional, be cautious with this in production)
    await prisma.tutoringAttendees.deleteMany();
    await prisma.sessionConcerns.deleteMany();
    await prisma.sessionInsights.deleteMany();
    await prisma.tutoringSession.deleteMany();
    await prisma.professorClass.deleteMany();
    await prisma.tutorSchedule.deleteMany();
    await prisma.class.deleteMany();
    await prisma.user.deleteMany();

    // Create Professors
    const professors = await Promise.all(
      Array.from({ length: 3 }).map(async () => {
        return await prisma.user.create({
          data: {
            clerkUserId: faker.string.uuid(),
            email: faker.internet.email(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            imageUrl: faker.image.avatar(),
            userType: UserType.Professor,
          },
        });
      })
    );

    // Create Tutors
    const tutors = await Promise.all(
      Array.from({ length: 5 }).map(async () => {
        return await prisma.user.create({
          data: {
            clerkUserId: faker.string.uuid(),
            email: faker.internet.email(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            imageUrl: faker.image.avatar(),
            userType: UserType.Tutor,
          },
        });
      })
    );

    // Create Students
    const students = await Promise.all(
      Array.from({ length: 10 }).map(async () => {
        return await prisma.user.create({
          data: {
            clerkUserId: faker.string.uuid(),
            email: faker.internet.email(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            imageUrl: faker.image.avatar(),
            userType: UserType.Student,
          },
        });
      })
    );

    // Create Classes
    const classes = await Promise.all(
      Array.from({ length: 4 }).map(async () => {
        return await prisma.class.create({
          data: {
            className: faker.company.buzzNoun(),
            classSection: faker.number.int({ min: 1, max: 5 }),
            tutoringGuidelines: faker.lorem.sentences(2),
          },
        });
      })
    );

    // Assign Professors to Classes
    await Promise.all(
      professors.map(async (professor) => {
        const assignedClasses = faker.helpers.arrayElements(
          classes,
          faker.number.int({ min: 1, max: 2 })
        );
        return await Promise.all(
          assignedClasses.map(async (cls: { classId: string }) => {
            return await prisma.professorClass.upsert({
              where: {
                professorId_classId: {
                  professorId: professor.userId,
                  classId: cls.classId,
                },
              },
              update: {},
              create: {
                professorId: professor.userId,
                classId: cls.classId,
              },
            });
          })
        );
      })
    );

    // Assign Tutors to Schedules
    await Promise.all(
      tutors.map(async (tutor) => {
        const assignedClasses = faker.helpers.arrayElements(
          classes,
          faker.number.int({ min: 1, max: 2 })
        );
        return await Promise.all(
          assignedClasses.map(async (cls: { classId: string }) => {
            return await prisma.tutorSchedule.upsert({
              where: {
                tutorId_assignedClass: {
                  tutorId: tutor.userId,
                  assignedClass: cls.classId,
                },
              },
              update: {},
              create: {
                tutorId: tutor.userId,
                assignedClass: cls.classId,
                Assigned_DOW: faker.date.weekday(),
                shiftStartTime: faker.date.soon(),
                shiftEndTime: faker.date.soon(),
              },
            });
          })
        );
      })
    );

    // Create Tutoring Sessions
    const tutoringSessions = await Promise.all(
      Array.from({ length: 15 }).map(async () => {
        const tutor = faker.helpers.arrayElement(tutors);
        const cls = faker.helpers.arrayElement(classes);
        return await prisma.tutoringSession.create({
          data: {
            tutorId: tutor.userId,
            classTutored: cls.classId,
            sessionLocation: faker.location.buildingNumber(),
            chapterReviewed: faker.lorem.words(3),
            classSection: cls.classSection,
            sessionStartTime: faker.date.future(),
            sessionEndTime: faker.date.future(),
            numStudentsTutored: faker.number.int({ min: 1, max: 10 }),
          },
        });
      })
    );

    // Assign Attendees to Tutoring Sessions
    await Promise.all(
      tutoringSessions.map(async (session) => {
        const numAttendees = faker.number.int({ min: 1, max: 5 });
        return await Promise.all(
          Array.from({ length: numAttendees }).map(async () => {
            const student = faker.helpers.arrayElement(students);
            return await prisma.tutoringAttendees.upsert({
              where: {
                sessionId_studentId: {
                  sessionId: session.sessionId,
                  studentId: faker.string.uuid(),
                },
              },
              update: {},
              create: {
                sessionId: session.sessionId,
                studentName: `${student.firstName} ${student.lastName}`,
                studentEmail: student.email,
                studentId: faker.string.uuid(),
              },
            });
          })
        );
      })
    );

    // Create Session Insights and Concerns
    await Promise.all(
      tutoringSessions.map(async (session) => {
        // Session Insights
        await prisma.sessionInsights.create({
          data: {
            sessionId: session.sessionId,
            studentInsights: faker.lorem.sentences(2),
            tutorInsights: faker.lorem.sentences(2),
          },
        });

        // Session Concerns
        await prisma.sessionConcerns.create({
          data: {
            sessionId: session.sessionId,
            topic: faker.lorem.word(),
            concerns: faker.lorem.sentences(2),
          },
        });
      })
    );

    // Create Class Insights
    await Promise.all(
      classes.map(async (cls) => {
        await prisma.classInsights.create({
          data: {
            classId: cls.classId,
            studentInsights: faker.lorem.sentences(2),
            tutorInsights: faker.lorem.sentences(2),
          },
        });
      })
    );

    console.log("Database has been seeded. 🌱");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
