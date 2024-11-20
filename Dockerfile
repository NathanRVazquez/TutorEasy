# specify what image is needed to run our code
# we can use node alpine, a smaller version of node
FROM node:18-alpine 

# Specifies what directory has all of our code. 
# adds all our code to the image

WORKDIR /app

# specifies where the packages are so they can be installed
COPY package.json .

# shell command
RUN npm install

COPY . .

# ARG AZURE_AD_CLIENT_ID
# ARG AZURE_AD_CLIENT_SECRET
# ARG AZURE_AD_TENANT_ID
# ARG NEXTAUTH_URL

# ENV AZURE_AD_CLIENT_ID=${AZURE_AD_CLIENT_ID}
# ENV AZURE_AD_CLIENT_SECRET=${AZURE_AD_CLIENT_SECRET}
# ENV AZURE_AD_TENANT_ID=${AZURE_AD_TENANT_ID}
# ENV NEXTAUTH_URL=${NEXTAUTH_URL}

RUN npm run build

# exec form, array of strings
CMD ["npm", "start"]
