class RootController < ApplicationController

  require "sinatra/json"

  get('/') do
    render(:erb, :index)
  end

  post('/contact') do
    name = params[:name]
    email = params[:email]
    message = params[:message]
    deliver(name, email, message)
    "success".to_json

  end

    private

        def deliver(name, email, message)
        Pony.mail({
          :to => "mariatschettino@gmail.com",
          :subject => "Web Inquiry",
          :body => "#{name} at #{email} has sent you a message: #{message}",
          :via => :smtp,
          :via_options => {
            :address => 'smtp.gmail.com',
            :port => '587',
            :user_name => ENV['SENDGRID_USERNAME'],
            :password => ENV['SENDGRID_PASSWORD'],
            :authentication => :plain,
            :enable_starttls_auto => true
          }
        })
      end

end
