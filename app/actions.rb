# Homepage (Root path)
get '/' do
  erb :index
end

get '/contacts' do 
  content_type :json
  @contacts = Contact.all
  @contacts.to_json
end

post '/contacts' do 
  content_type :json
  @contact = Contact.new(
    first_name: params[:first_name],
    last_name: params[:last_name],
    email: params[:email],
    phone_number: params[:phone_number])
  if @contact.save
    status 200
    @contact.to_json
  else
    status 400
    @contact.errors.full_messages
  end
end

put '/contacts/:id' do
  content_type :json
  @contact =Contact.find(params[:id])
  if @contact.update_attributes(
    first_name: params[:first_name],
    last_name: params[:last_name],
    email: params[:email],
    phone_number: params[:phone_number])

    status 200
    @contact.to_json
  else
    status 400
    @contact.errors.full_messages
  end
end

delete '/contacts/:id' do
  content_type :json
  @contact =Contact.find(params[:id])
  @contact.delete
end







