# Build the project
echo "Building the project"
python3.11 -m pip install -r requirements.txt

echo "Make migration"
python3.11 manage.py migrate

echo "Collect static"
python3.11 manage.py collectstatic --noinput --settings=EarthLive.settings.prod